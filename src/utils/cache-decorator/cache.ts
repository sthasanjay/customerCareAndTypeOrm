import hash from "object-hash";
import { redisClient } from "../../redisClient";
import log from "../../logger";

export interface Config {
  // A custom key function can be supplied to customize the key to be used for caching.
  key?: (...args: any[]) => any;
  //With ttl (time to live), the cache will never live longer than the given number of milliseconds.
  ttl?: number;
}

interface IMapCacheObject {
  payload: any;
  timeout?: number;
}
export function cache(config: Config = {}) {
  /*
  Cache decorator

  Caches decorated function response in redis cache

  NOTE:
  > After using this decorator, you need to `await` the function call
  > return values are always Jsonified
  */
  return function (
    target: object,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const prop = propertyDescriptor.value ? "value" : "get";
    const originalFunction = propertyDescriptor[prop];
    propertyDescriptor[prop] = async function (...args: any[]) {
      let cacheResult: IMapCacheObject;
      log.info(args);
      const key = config.key
        ? hash({ fn: originalFunction, args: config.key.apply(this, args) })
        : hash({ fn: originalFunction, args });
      const _cacheResult = await redisClient.get(key);
      if (_cacheResult) {
        cacheResult = JSON.parse(_cacheResult);
      }
      let timeout = cacheResult?.timeout ?? Infinity;

      if (cacheResult && (!config.ttl || timeout > Date.now())) {
        log.info("cached data");
        return cacheResult.payload;
      }
      const payload = await originalFunction.apply(this, args);
      timeout = Date.now() + config.ttl;
      config.ttl
        ? await redisClient.set(
            key,
            JSON.stringify({
              payload,
              timeout,
            }),
            "PXAT",
            timeout
          )
        : await redisClient.set(
            key,
            JSON.stringify({
              payload,
              timeout,
            })
          );
      log.info("noncached data");
      return typeof payload === "object" ? JSON.parse(JSON.stringify(payload)) : payload;
    };

    return propertyDescriptor;
  };
}
