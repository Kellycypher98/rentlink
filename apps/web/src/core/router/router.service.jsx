import { useRouter, useParams } from 'next/navigation';
import { RouterObject } from './router.object';

/**
 * @provider Next Router
 * @description The application uses NextJS Router for navigation. You shall use router.push(path) for navigation and links across the pages.
 * @usage `const router = useRouter(); router.push(path); `
 * @function {(path: string) => void} push - Navigate to the path
 * @import import { useRouter, useParams } from 'next/navigation'
 */
const RouterService = {
  buildUrl(route, params = {}) {
    let routeBuilt = route;

    Object.entries(params).forEach(([key, value]) => {
      routeBuilt = routeBuilt.replace(`:${key}`, value);
    });

    return routeBuilt;
  },

  restoreUrl(route, params) {
    let routeRestored = route;

    Object.entries(params).forEach(([key, value]) => {
      routeRestored = routeRestored.replace(value, `:${key}`);
    });

    return routeRestored;
  },

  applyParamsToUrl(route, params) {
    let routeRestored = route;

    Object.entries(params).forEach(([key, value]) => {
      routeRestored = routeRestored.replace(`:${key}`, value);
    });

    return routeRestored;
  },

  getDepth(route) {
    return route?.split('/').filter(item => item !== '').length;
  }
};

export default RouterService;
