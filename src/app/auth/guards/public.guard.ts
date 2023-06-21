import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkPublicStatus = (): boolean | Observable<boolean> => {
  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.checkAuthentication().pipe(
    map( isAuthenticated => !isAuthenticated ),
    tap( noAuthenticated => {
      if ( !noAuthenticated ) {
        router.navigate([ './' ] );
      }
    }),
  );
}

export const canMatchPublic: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
  return checkPublicStatus();
}

export const canActivatePublic: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {
  return checkPublicStatus();
}
