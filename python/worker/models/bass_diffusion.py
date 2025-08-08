# Bass diffusion model implementation
# ... existing code ...
from typing import Dict, Any, List, Tuple


def simulate_bass(p: float, q: float, M: float, dt: float, t_end: float) -> Tuple[List[float], List[float]]:
    """
    Simulate the Bass diffusion model using simple Euler integration.

    dA/dt = p * (M - A) + (q / M) * A * (M - A)

    Args:
        p: Coefficient of innovation
        q: Coefficient of imitation
        M: Market potential (maximum adopters)
        dt: Time step for integration
        t_end: End time for simulation

    Returns:
        (t_list, A_list): Time points and adoption level at each time
    """
    if dt <= 0:
        raise ValueError("dt must be > 0")
    if t_end < 0:
        raise ValueError("t_end must be >= 0")
    if M <= 0:
        raise ValueError("M must be > 0")

    num_steps = int(round(t_end / dt))
    # Ensure we include t=0 and t_end
    t_list: List[float] = [0.0]
    A_list: List[float] = [0.0]  # Start with no adopters

    A = 0.0
    t = 0.0
    for _ in range(num_steps):
        adoption_gap = max(M - A, 0.0)
        dA_dt = p * adoption_gap + (q / M) * A * adoption_gap
        A_next = A + dt * dA_dt
        # Clamp to valid range
        if A_next < 0.0:
            A_next = 0.0
        if A_next > M:
            A_next = M
        t = t + dt
        t_list.append(round(t, 10))
        A_list.append(A_next)
        A = A_next

    # If due to rounding we didn't exactly hit t_end, append final point
    if t_list[-1] < t_end:
        remaining = t_end - t_list[-1]
        adoption_gap = max(M - A, 0.0)
        dA_dt = p * adoption_gap + (q / M) * A * adoption_gap
        A_next = A + remaining * dA_dt
        if A_next < 0.0:
            A_next = 0.0
        if A_next > M:
            A_next = M
        t_list.append(t_end)
        A_list.append(A_next)

    return t_list, A_list


def run_bass(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Run the Bass diffusion model based on provided payload.

    Expected payload structure:
      {
        "spec": {
          "kind": "python",
          "entry": "python.models.bass_diffusion:model",
          "variables": ["A"],
          "dt": 0.5,
          "t_end": 50
        },
        "params": {"p": 0.03, "q": 0.38, "M": 10000}
      }

    Returns a dict with keys: series, metrics
    where series = { t: [...], y: { A: [...] } }
    """
    spec = payload.get("spec", {})
    params = payload.get("params", {})

    p = float(params.get("p"))
    q = float(params.get("q"))
    M = float(params.get("M"))
    dt = float(spec.get("dt"))
    t_end = float(spec.get("t_end"))

    t_list, A_list = simulate_bass(p=p, q=q, M=M, dt=dt, t_end=t_end)

    series = {
        "t": t_list,
        "y": {
            "A": A_list,
        },
    }

    # Simple metrics
    adoption_fraction = A_list[-1] / M if M > 0 else None
    metrics = {
        "final_adopters": A_list[-1],
        "market_potential": M,
        "adoption_fraction": adoption_fraction,
    }

    return {"series": series, "metrics": metrics}