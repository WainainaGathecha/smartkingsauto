# Smartkings Auto Tyres

A tyre sales shop lead generation website

## Problem

The business operates in Kahawa Sukari and relies entirely on word of mouth and foot traffic for new customers. People in Nairobi searching for tyres have no way to find them, evaluate what they offer, or contact them directly without physically visiting.

## Solution

The website solves this by creating a digital presence that turns online searches into phone calls and WhatsApp messages

## Audience

- Individual car owners
- Matatus and bus operators
- Truck and heavy operators

## Features

- Hero section
- Services section
- Products and Pricing section
- Why choose us section
- Location section
- Sticky contact on mobile
- Responsive design for mobile and desktop

### To add later

- Online booking system
- Customer reviews integration
- Live Chat
- Backend or database of any kind

## Tech Stack

- HTML
- Tailwind CSS v4
- JavaScript
- Lucide
- Google Maps
- Vercel

No frameworks needed. This is a static informational site. React would be unnecessary complexity for what this product needs to do.

## How to install

### Prerequisites

Make sure you have [Node.js] installed on your machine.

### Installation

1. Clone the repository

```bash
   git clone https://github.com/yourusername/smartkingsauto.git
```

2. Navigate into the project folder

```bash
   cd smartkingsauto
```

3. Install dependancies

```bash
   npm install
```

4. Start the Tailwind build process

```bash
   npm run dev
```

5. Open `index.html` in your browser

Any changes you make to your files will automatically rebuild the CSS while `npm run dev` is running.

### Usage

Visit the live site or run it locally following the installation steps above

## Project status

In progress

## How I categorized the tyres

I used the most common cars in Kenya by vehicle type and the sizes of those vehicle types. Then I map brands to vehicle types. Not all brands cover all vehicle types:

- Roadcruza - covers everything
- Wanda - saloon, suv, van, matatu
- Compasal - saloon, suv, truck
- Comforser - saloon, suv
- Boto - saloon, van
- Goddard - saloon, suv
- Double King - saloon, matatu
- Taitong - truck (their specialty)
- Mirage - saloon, suv

For each brand I pick the most relevant vehicle types and 2-3 sizes each

### Saloon/sedan

Most common cars in Kenya: Toyota Fielder, Axio, Allion, Premio, Vitz, Honda Fit, Mazda Demio, Nissan Note, Tilda

- 185/70R14 - Fielder, Axio, older models
- 195/65R15 - Allion, Premio, newer Fielder
- 205/55R16 - newer models
- 175/70R13 - Vitz, Demio, small cars
- 185/65R15 - common size

### SUV

Prado, Rav4, Harrier, CX-5, Fortuner, Land Cruiser

- 215/65R16 - RAV4, CX-5
- 235/65R17 - Prado, Fortuner
- 265/65R17 - Land Cruiser, Larger SUVs
- 225/65R17 - mid-size SUVs

### Van

Noah, Voxy, Wish, Sienta (family vans)

- 195/65R15 - Noah, Voxy
- 205/65R15 - common van size
- 215/60R16 - newer vans

### Matatu

14-seater(Nissan Matatu), 33-seater

- 195R14C - standard 14-seater matatu
- 185R14c - smaller matatus
- 215/75R15LT - Larger matatus
- 195R15C

### Truck

Lorries pickups

- 7.50R16 - common truck size
- 11R22.5 - large trucks
- 7.00R16 - light trucks
