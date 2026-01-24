
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Load env vars from .env.local

import mongoose from 'mongoose';
import dbConnect from '../lib/mongodb';
import Startup from '../lib/models/Startup';
import { embedText } from '../lib/gemini';

const SAMPLE_STARTUPS = [
    {
        name: "EcoHarvest",
        description: "AI-driven precision agriculture platform reducing water usage by 40% and optimizing capability for small-to-medium farms.",
        market: "AgTech",
        team: "Ex-Google AI researchers and agronomy PhDs. CTO has 2 previous exits.",
        revenue: "$50k MRR, growing 20% MoM",
        funding: "Pre-seed: $500k raised"
    },
    {
        name: "MediMatch",
        description: "Marketplace connecting freelance healthcare professionals with understaffed hospitals using predictive staffing algorithms.",
        market: "HealthTech",
        team: "Founded by former hospital administrators and backend engineers.",
        revenue: "$120k ARR",
        funding: "Bootstrapped"
    },
    {
        name: "SecureChain",
        description: "Blockchain-based supply chain transparency tool for luxury goods, preventing counterfeits.",
        market: "Web3 / Logistics",
        team: "Strong crypto background, weak sales experience.",
        revenue: "Pre-revenue",
        funding: "Seed: $2M raised from crypto VCs"
    },
    {
        name: "EdVantage",
        description: "Personalized learning platform for K-12 students using adaptive testing to identify gaps in math and science.",
        market: "EdTech",
        team: "Former teachers and Stanford CS grads.",
        revenue: "$10k MRR",
        funding: "Grant funded: $200k"
    },
    {
        name: "BioSynthetix",
        description: "Synthetic biology platform for creating sustainable textile dyes from bacteria.",
        market: "BioTech / Sustainability",
        team: "PhD scientists from MIT.",
        revenue: "Pre-revenue, 2 pilots with major fashion brands",
        funding: "Seed: $3.5M"
    },
    {
        name: "FinFlow",
        description: "Automated cash flow management and forecasting for freelancers and gig workers.",
        market: "FinTech",
        team: "Solo founder with deep fintech design experience.",
        revenue: "$5k MRR",
        funding: "Bootstrapped"
    },
    {
        name: "RoboBarista",
        description: "Compact robotic coffee kiosks for office buildings and airports, fully autonomous.",
        market: "Robotics / FoodTech",
        team: "Hardware engineers from Tesla.",
        revenue: "$20k MRR from 2 locations",
        funding: "Pre-seed: $1M"
    },
    {
        name: "VirtualVogue",
        description: "AR fashion try-on plugin for e-commerce stores, improving conversion rates.",
        market: "E-commerce / AR",
        team: "Computer vision experts.",
        revenue: "$80k ARR",
        funding: "Seed: $1.2M"
    },
    {
        name: "CleanCredits",
        description: "SaaS platform for carbon credit verification and trading for small businesses.",
        market: "ClimateTech",
        team: "Mixed background in finance and environmental science.",
        revenue: "Pre-revenue",
        funding: "Pre-seed: $300k"
    }
];

async function seed() {
    console.log('🌱 Connecting to MongoDB...');
    await dbConnect();

    console.log('Clearing existing startups...');
    await Startup.deleteMany({});

    console.log('🚀 Seeding startups...');
    for (const startup of SAMPLE_STARTUPS) {
        console.log(`Processing ${startup.name}...`);

        // Create text for embedding
        const textToEmbed = `
      Name: ${startup.name}
      Description: ${startup.description}
      Market: ${startup.market}
      Team: ${startup.team}
      Revenue: ${startup.revenue}
      Funding: ${startup.funding}
    `;

        try {
            const embedding = await embedText(textToEmbed);
            await Startup.create({
                ...startup,
                embedding
            });
            console.log(`✅ ${startup.name} seeded with embedding.`);
        } catch (error) {
            console.error(`❌ Failed to seed ${startup.name}:`, error);
        }
    }

    console.log('✨ Seeding complete!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
