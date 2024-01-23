import {describe, expect, it} from "vitest";
import {formatDate} from "../src/composables/formatDate";

describe('Unit Tests for formateDate composable', () => {
  it('when date is valid then return formatted date', () => {
    const actualDate1 = '2024-01-23';
    const expectedDate1 = '23.01.2024';
    const resultDate1 = formatDate(actualDate1);

    const actualDate2 = '2024-02-01';
    const expectedDate2 = '01.02.2024';
    const resultDate2 = formatDate(actualDate2);

    expect(resultDate1).toBe(expectedDate1);
    expect(resultDate2).toBe(expectedDate2);
  });
  it('when date is invalid then return empty string', () => {
    const invalidDate = '2023-11-89';
    const result = formatDate(invalidDate);
    expect(result).toBe('');
  });
});
