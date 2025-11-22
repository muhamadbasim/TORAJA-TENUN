# AGENTS.md - Services

## Package Identity
- **Purpose**: Business logic, API integrations, and data fetching.
- **Tech**: TypeScript, Google GenAI SDK.

## Patterns & Conventions
- **File Structure**: Group by domain (e.g., `geminiService.ts`).
- **Async/Await**: Always use async/await for external calls.
- **Error Handling**: Wrap external calls in try/catch and return structured errors or throw specific exceptions.

### Code Examples
- **✅ DO**: Exported async functions with typed return values.
  ```typescript
  // services/exampleService.ts
  import { GoogleGenerativeAI } from "@google/genai";

  export async function fetchData(query: string): Promise<string> {
    try {
      // ... logic
      return "result";
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  ```

## Touch Points / Key Files
- **AI Integration**: `services/geminiService.ts` (Google Gemini API setup and calls)

## JIT Index Hints
- **Find API Keys**: `rg "API_KEY" services`
- **Find GenAI usage**: `rg "GoogleGenerativeAI" services`
