import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RealtimeDbRepositoryImpl } from './realtime-db.repository.impl';

describe('RealtimeDbRepositoryImpl', () => {
  let service: RealtimeDbRepositoryImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RealtimeDbRepositoryImpl,
        { provide: AngularFireDatabase, useValue: {} },
      ],
    });
    service = TestBed.inject(RealtimeDbRepositoryImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
