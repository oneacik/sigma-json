# JSONPath Visualizer

Jeez, I finally did it.  
Maybe if I haven't written so many tests it would take much shorter.  
...or much much longer...

## Highlights
- I used enzyme to test React - lesson learned: first mount, then shallow
- Mobx is great, I will never think about redux again
- Object.assign greatly simplifies Mobx interaction
- Domain is quite well separated from the rest of app
- I used rems for relative units
- Javascript lacks proper HashSets for objects, it is horrible - needed implement oversimplified version myself
- Select mechanism for JSONPath is implemented using jsonpath.paths + hashes
- I can select 100k json properties in 4 seconds, not great, not terrible.
- Implemented simple border colors for validation feedback 
- TDDed most of the application - it caught many mistakes that could take much of time
- I used UTF-8 symbols as icons - they look well in firefox and chrome - it is my little shortcut
- JSONPath input contains debounce - it was really hard to test it but fake-timers did it
