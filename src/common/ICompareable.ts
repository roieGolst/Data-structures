export type CompareItem = any | number | string;

export interface ICompareable<CompareItem> {
    compere(item: CompareItem): number
}

export type EqualsFunction<T> = (item: T) => boolean;
export  class Compareable<T> {
    compare: (itemA: CompareItem, itemB: CompareItem) => number;

    constructor(compareFun: (itemA: T, itemB: T) => number) {
        this.compare = compareFun || Compareable.defaultCompareFunction;
    }

    static defaultCompareFunction(itemA: number | string, itemB: number | string): number {
        if(itemA == itemB) {
            return 0;
        }
        else if(itemA > itemB) { 
            return 1;
        }

        return -1;
    }

    equals(itemA: T | number | string, itemB: T | number | string): boolean {
        if(itemA === itemB) return true;
        
        return this.compare(itemA, itemB) == 0;
    }

    lessThan(itemA: CompareItem, itemB: CompareItem): boolean {
        return this.compare(itemA, itemB) < 0;
      }
      
    greaterThan(itemA: CompareItem, itemB: CompareItem): boolean {
        return this.compare(itemA, itemB) > 0;
    }
    
    lessThanOrEqual(itemA: CompareItem, itemB: CompareItem): boolean {
        return this.lessThan(itemA, itemB) || this.equals(itemA, itemB);
    }
    
    greaterThanOrEqual(itemA: CompareItem, itemB: CompareItem): boolean {
        return this.greaterThan(itemA, itemB) || this.equals(itemA, itemB);
    }
}