import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("users-api");

export async function GET(request) {
  const span = tracer.startSpan("users.fetch");
  try {
    // Simulate database fetch with delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    span.setAttribute("users.count", users.length);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
  } finally {
    span.end();
  }
}

export async function POST(request) {
  const span = tracer.startSpan("db.create_user");
  try {
    // Parse the request body
    const body = await request.json();
    const { name } = body;

    // e.g. Insert new user into your DB
    const newUser = { id: Date.now(), name };

    span.setAttributes({
      "db.user_name": name,
      "db.user_id": newUser.id,
    });

    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
  } finally {
    span.end();
  }
}
