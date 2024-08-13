export class DecimalTransformer {
  constructor(private precision: number) {}

  from(value: string): number {
    return parseFloat(value);
  }

  to(value: number): string {
    return value.toFixed(this.precision);
  }
}
