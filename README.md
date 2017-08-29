# 🌊 sea-floor

Sea-floor is [a magic little](https://www.youtube.com/watch?v=GC_mV1IpjWA) library that makes building electron apps in React super duper easy. 

In fact, your entire electron app can be:

``` js 
import Sea from 'sea-floor';

Sea.open(path.resolve(__dirname, "./path/to/react/component.js"));
```

Then run your app with:

``` sh
$ sea path/to/file.js
```

## Status
Sea-floor is still being developed at the moment. If you're curious, you can try it out for yourself! Otherwise it might be a good idea to not build anything on top of this at the moment.  

## TODO 
- Update the test suite
- Add better docs
- Figure out a proper way of handling styles
- Add hot code reloading
- Figure out a way to take in components instead of filepaths (ie: `Sea.open(<MyApp />)` )
- Add an "escape hatch" that lets people add their own webpack config if they would like