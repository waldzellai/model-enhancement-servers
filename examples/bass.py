"""
Python model 'bass.py'
Translated using PySD
"""

from pathlib import Path

from pysd.py_backend.statefuls import Integ
from pysd import Component

__pysd_version__ = "3.14.3"

__data = {"scope": None, "time": lambda: 0}

_root = Path(__file__).parent


component = Component()

#######################################################################
#                          CONTROL VARIABLES                          #
#######################################################################

_control_vars = {
    "initial_time": lambda: 0,
    "final_time": lambda: 10,
    "time_step": lambda: 1,
    "saveper": lambda: time_step(),
}


def _init_outer_references(data):
    for key in data:
        __data[key] = data[key]


@component.add(name="Time")
def time():
    """
    Current time of the model.
    """
    return __data["time"]()


@component.add(name="INITIAL TIME", comp_type="Constant", comp_subtype="Normal")
def initial_time():
    """
    The initial time for the simulation.
    """
    return __data["time"].initial_time()


@component.add(name="FINAL TIME", comp_type="Constant", comp_subtype="Normal")
def final_time():
    """
    The final time for the simulation.
    """
    return __data["time"].final_time()


@component.add(name="TIME STEP", comp_type="Constant", comp_subtype="Normal")
def time_step():
    """
    The time step for the simulation.
    """
    return __data["time"].time_step()


@component.add(
    name="SAVEPER",
    comp_type="Auxiliary",
    comp_subtype="Normal",
    depends_on={"time_step": 1},
)
def saveper():
    """
    The save time step for the simulation.
    """
    return __data["time"].saveper()


#######################################################################
#                           MODEL VARIABLES                           #
#######################################################################


@component.add(name="k", comp_type="Constant", comp_subtype="Normal")
def k():
    return 0.1


@component.add(
    name="decay",
    comp_type="Auxiliary",
    comp_subtype="Normal",
    depends_on={"k": 1, "stock": 1},
)
def decay():
    return k() * stock()


@component.add(
    name="stock",
    comp_type="Stateful",
    comp_subtype="Integ",
    depends_on={"_integ_stock": 1},
    other_deps={"_integ_stock": {"initial": {}, "step": {"decay": 1}}},
)
def stock():
    return _integ_stock()


_integ_stock = Integ(lambda: -decay(), lambda: 100, "_integ_stock")
