#HashMap Odin Lesson

Hash: Calculates the hash code for keys using a hash function.  
Set: Associates a value with a key in the HashMap.  
Get: Retrieves the value associated with a given key.  
Has: Checks if a key exists in the HashMap.  
Remove: Deletes the value associated with a given key.  
Length: Returns the number of key-value pairs in the HashMap.  
Clear: Removes all key-value pairs from the HashMap.  
Keys: Returns an array of all keys in the HashMap.  
Values: Returns an array of all values in the HashMap.  
Entries: Returns an array of all key-value pairs in the HashMap. 

```javascript
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
