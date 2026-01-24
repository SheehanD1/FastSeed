
import Startup from './models/Startup';
import dbConnect from './mongodb';

// Basic Cosine Similarity function
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function searchStartups(queryEmbedding: number[], limit: number = 5) {
    await dbConnect();

    // 1. Fetch all startups with embeddings (In production, use Atlas Vector Search!)
    // Optimized: Select only needed fields + embedding
    const startups = await Startup.find({ embedding: { $exists: true } }).select('name description market team revenue funding embedding');

    // 2. Calculate similarities
    const results = startups.map((startup) => {
        const similarity = cosineSimilarity(queryEmbedding, startup.embedding);
        return {
            ...startup.toObject(),
            similarity,
        };
    });

    // 3. Sort by similarity descending
    results.sort((a, b) => b.similarity - a.similarity);

    // 4. Return top N
    return results.slice(0, limit);
}
