## Study of solar prosumer electricity exchange resiliency

Visit the first implementation [here](https://git-toni.github.io/solar-exchange)

### Description

This is a simple simulation based on:

- A variable pool of `Prosumer`s
- Each `Prosumer` has a certain electricity storage capacity.
- Each `Prosumer` has a certain PV generation capacity.
- Each `Prosumer` consumes electricity.
- Generation and consumption depend on the time of the day, ie. sunlight. Modelled by simple curves.
- At consumption, if a `Prosumer` needs electricity(because falls short of storage/generation) it can purchase it from other `Prosumer`s given some conditions(Seller has > `threshold`% of storage)
- 

### Aspects analyzed

The main goal of this experiment is to analyze the behavior of a Prosumer-based electricity exchange. So far in this `v0.1.0` these are the main aspects studied vs time:

- Average electricity in the pool [`kW`]
- Average % of stored battery
- Total stored electricity

This will let us see how long the system can sustain itself without needing external electricity injection.

### Variable parameters

These are the variable parameters so far:

- Battery installation capacity. It can be uniformly distributed, ie. `[0, 4kWh, 8kWh, 16kWh]`, or unique `8kWh`
- PV installation capacity. Uniformly distributed, ie. `[0, 1kWh, 2kWh, 4kWh, 5kWh]`, or split [`1kWh`, `2kWh`]


### TODO

- Quantify marketplace transaction value. [€]
- Add external electricity injection and study the dependency on it for the system to never *die*.
- Different charing storage starting-point
- Study the influence of the % threshold for Sellers to be able to sell on the system.
- Analyze the balance of *bought* power vs *sold* power based on PV/Storage parameters.
- Move study to Pyton+Scipy + Pandas

