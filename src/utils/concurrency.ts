/**
 * Runs `worker` over `items` with at most `limit` calls in flight at once.
 * Unbounded parallelism (e.g. via Promise.all) is unsafe here because HEIC
 * decoding is a heavy WASM operation — firing hundreds of conversions at once
 * exhausts memory and can hang the browser tab with no error surfaced.
 */
export async function mapWithConcurrencyLimit<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let nextIndex = 0

  async function runNext(): Promise<void> {
    const index = nextIndex++
    if (index >= items.length) return
    results[index] = await worker(items[index], index)
    await runNext()
  }

  const workerCount = Math.min(limit, items.length)
  await Promise.all(Array.from({ length: workerCount }, runNext))

  return results
}
