var app = (function () { 'use strict';

var template = (function () {
  return {
    data () {
      return {
        canvas: [
          {title: 'default', href: ''},
          {title: 'basic', href: 'basic'},
          {title: 'basic:velocity', href: 'basic-velocity'},
          {title: 'basic:acceleration', href: 'basic-acceleration'},
          {title: 'basic:gravity', href: 'basic-gravity'},
          {title: 'basic:random', href: 'basic-random'},
          {title: 'basic:region', href: 'basic-region'},
          {title: 'basic:reflection', href: 'basic-reflection'},
          {title: 'multi', href: 'multi'},
          {title: 'multi:velocity', href: 'multi-velocity'},
          {title: 'multi:gravity', href: 'multi-gravity'},
          {title: 'multi:reflection', href: 'multi-reflection'},
          {title: 'multi:arc', href: 'multi-arc'},
          {title: 'multi:connection', href: 'multi-connection'},
          {title: 'multi:triangle-connection', href: 'multi-triangle-connection'},
          {title: 'sin', href: 'sin'},
          {title: 'sin:wave', href: 'sin-wave'},
          {title: 'sin:acceleration', href: 'sin-acceleration'},
          {title: 'sin:reflection', href: 'sin-reflection'},
          {title: 'sin:velocity', href: 'sin-velocity'},
          {title: 'noise', href: 'noise'},
          {title: 'noise:simple', href: 'noise-simple'},
          {title: 'noise:circle', href: 'noise-circle'},
          {title: 'noise:line', href: 'noise-line'},
          {title: 'artwork:alpha', href: 'artwork-alpha'},
          {title: 'artwork:fish', href: 'artwork-fish'},
          {title: 'artwork:puzzle', href: 'artwork-puzzle'}
        ].map(item => ({
          title: item.title,
          href: window.location.origin + window.location.pathname + (item.href && '?code=' + item.href)
        }))
      }
    }
  }
}());

function add_css () {
	var style = createElement( 'style' );
	style.id = 'svelte-453082682-style';
	style.textContent = "\n  p[svelte-453082682], [svelte-453082682] p, a[svelte-453082682], [svelte-453082682] a {\n    display: inline;\n    margin: 0;\n    padding: 0;\n    font-size: 1rem;\n    text-decoration: none;\n    color: #0091EA;\n    letter-spacing: 2px;\n    line-height: 1.5rem\n  }\n\n  a[svelte-453082682]:hover, [svelte-453082682] a:hover {\n    color: #64FFDA\n  }\n\n  [svelte-453082682].footer, [svelte-453082682] .footer {\n    padding-top: 10px\n  }\n";
	appendNode( style, document.head );
}

function create_main_fragment ( state, component ) {
	var div, text, div_1, p, text_1, text_3, div_2, a, text_4;

	var each_block_value = state.canvas;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
	}

	return {
		create: function () {
			div = createElement( 'div' );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].create();
			}

			text = createText( "\n  " );
			div_1 = createElement( 'div' );
			p = createElement( 'p' );
			text_1 = createText( "license:MIT" );
			text_3 = createText( "\n  " );
			div_2 = createElement( 'div' );
			a = createElement( 'a' );
			text_4 = createText( "uufish/artworks" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-453082682', '' );
			div_1.className = "footer";
			a.target = "_blank";
			a.href = "https://github.com/uufish/artworks";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].mount( div, null );
			}

			appendNode( text, div );
			appendNode( div_1, div );
			appendNode( p, div_1 );
			appendNode( text_1, p );
			appendNode( text_3, div );
			appendNode( div_2, div );
			appendNode( a, div_2 );
			appendNode( text_4, a );
		},

		update: function ( changed, state ) {
			var each_block_value = state.canvas;

			if ( 'canvas' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].create();
						each_block_iterations[i].mount( div, text );
					}
				}

				for ( ; i < each_block_iterations.length; i += 1 ) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}
		},

		unmount: function () {
			detachNode( div );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].unmount();
			}
		},

		destroy: function () {
			destroyEach( each_block_iterations, false, 0 );
		}
	};
}

function create_each_block ( state, each_block_value, item, item_index, component ) {
	var div, a, a_href_value, text_value, text;

	return {
		create: function () {
			div = createElement( 'div' );
			a = createElement( 'a' );
			text = createText( text_value = item.title );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = a_href_value = item.href;
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( a, div );
			appendNode( text, a );
		},

		update: function ( changed, state, each_block_value, item, item_index ) {
			if ( a_href_value !== ( a_href_value = item.href ) ) {
				a.href = a_href_value;
			}

			if ( text_value !== ( text_value = item.title ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: noop
	};
}

function app ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	if ( !document.getElementById( 'svelte-453082682-style' ) ) add_css();

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}
}

assign( app.prototype, {
 	get: get,
 	fire: fire,
 	observe: observe,
 	on: on,
 	set: set
 });

app.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

app.prototype.teardown = app.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement(name) {
	return document.createElement(name);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function createText(data) {
	return document.createTextNode(data);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
}

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	callAll(this._root._oncreate);
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (differs(newValue, oldValue)) {
			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

return app;

}());