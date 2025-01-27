class HashMap{
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
      }
    hash(key) {
         let hashCode = 0;
         const  primeNumber = 31;
         for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i));
         }
         return hashCode % this.capacity;
    }
    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    this.set(key, value);
                }
            }
        }
    }
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [storedKey, storedValue] of bucket) {
            if (storedKey === key) {
                storedValue = value;
                return this;
            }
        }
        bucket.push([key, value]);
        this.size++;
        if (this.size > this.capacity * this.loadFactor) {
            this.resize();
        }
    }
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [storedKey, storedValue] of bucket) {
            if (storedKey === key) {
                return storedValue;
            }
        }
        return null;
    }
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [storedKey] of bucket) {
            if (storedKey === key) {
                return true;
            }
        }
        return false;
    }
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }
    length() {
        return this.size;
    }
    clear() {
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }
    keys() {
        const keysArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key] of bucket) {
                    keysArray.push(key);
                }
            }
        }
        return keysArray;
    }
    values() {
        const valuesArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [, value] of bucket) {
                    valuesArray.push(value);
                }
            }
        }
        return valuesArray;
    }
    entries() {
        const entriesArray = [];

        for (const bucket of this.buckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    entriesArray.push([key, value]);
                }
            }
        }
        return entriesArray;
    }
}   

// TEST
const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// hash
console.log(test.hash('apple'));

// get
console.log('Get:' + ' '+test.get('apple'));

// has  
console.log('Has the key:' + ' '+test.has('apple'));

// length
console.log('Length is:' + ' '+test.length());

// all keys
console.log('All keys:' + ' '+ test.keys());

// all values
console.log('All values:' + ' '+ test.values());

// all entries
console.log('All entries:' + ' '+ test.entries());

console.log(test);