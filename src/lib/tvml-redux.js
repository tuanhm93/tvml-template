let store = null;

export function Provider(storeInstance) {
	store = storeInstance;
}

export function connect(mapData) {
	return function (classImplement) {
		return class extends classImplement {
			constructor(...args) {
				super(...args);
				this.data = mapData(store.getState());
				store.subscribe(() => {
					const nextData = mapData(store.getState());
					const keys = Object.keys(nextData);
					for(let i=0; i<keys.length;i++) {
						const keyName = keys[i];
						if(this.data[keyName] !== nextData[keyName]) {
							this.onDataChange && this.onDataChange(nextData);
							let shouldRender = false;
							if(this.shouldComponentUpdate && (this.shouldComponentUpdate(nextData))) {
								shouldRender = true;
							}
							this.data = nextData;

							if(shouldRender) {
								this.render && this.render();
							}

							break;
						}
					} 
				});
			}
		}
	}
}