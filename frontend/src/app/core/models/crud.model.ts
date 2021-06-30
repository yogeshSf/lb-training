import { Observable } from 'rxjs';

export interface CrudOperationsI<T, ID> {
    create(t: T): Observable<T>;
    update(id: ID, t: T): Observable<T>;
    getOne(id: ID): Observable<T>;
    getAll(): Observable<T[]>;
    delete(id: ID): Observable<any>;
}