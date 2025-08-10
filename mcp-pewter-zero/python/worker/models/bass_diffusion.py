# Minimal Bass diffusion model (pure Python fallback)
# dA/dt = p*(M - A) + q*(A/M)*(M - A)
# where A is adopters, M market size, p innovation, q imitation

def simulate_bass(p, q, M, dt, t_end):
    steps = int(t_end / dt)
    A = 0.0
    t_series = []
    A_series = []
    for i in range(steps+1):
        t = i * dt
        t_series.append(t)
        A_series.append(A)
        dA = p*(M - A) + q*(A/M)*(M - A)
        A = A + dt * dA
        if A < 0: A = 0
        if A > M: A = M
    return { 't': t_series, 'y': { 'A': A_series } }


def run_bass(spec, params):
    dt = float(spec['dt']); t_end = float(spec['t_end'])
    p = float(params['p']); q = float(params['q']); M = float(params['M'])
    series = simulate_bass(p, q, M, dt, t_end)
    return { 'series': series, 'metrics': { 'final_A': series['y']['A'][-1] } }


def sweep_bass(spec, grid, budget=None):
    dt = float(spec['dt']); t_end = float(spec['t_end'])
    values_p = grid.get('p', [0.01])
    values_q = grid.get('q', [0.1])
    values_M = grid.get('M', [1000])
    runs = []
    count = 0
    for p in values_p:
        for q in values_q:
            for M in values_M:
                if budget is not None and count >= budget:
                    break
                series = simulate_bass(float(p), float(q), float(M), dt, t_end)
                runs.append({ 'params': { 'p': p, 'q': q, 'M': M }, 'series': series })
                count += 1
    return { 'runs': runs }


def sensitivity_bass(spec, baseline, method='one_at_a_time'):
    # Very rough OAT: small perturbations
    eps = 0.05
    base = run_bass(spec, baseline)
    base_final = base['series']['y']['A'][-1]
    ranking = []
    for k in ['p','q','M']:
        perturbed = dict(baseline)
        perturbed[k] = baseline[k] * (1+eps)
        out = run_bass(spec, perturbed)
        final = out['series']['y']['A'][-1]
        importance = abs(final - base_final) / (abs(base_final) + 1e-9)
        ranking.append({ 'param': k, 'importance': importance })
    ranking.sort(key=lambda x: x['importance'], reverse=True)
    return { 'ranking': ranking }