//TestDriver Class
namespace ListManipulation {
  

    class List<T> {
        private _list: T[];

        get list(): T[] {
            return this._list;
        }

        set list(newList: T[]) {
            this._list = newList;
        }

        constructor(list: T[]) {
            this._list = list;
        }
        
    }
   
}
