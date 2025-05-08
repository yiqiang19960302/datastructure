class Heap{
	constructor(){
		this.heap = new Array();
		this.heap.push(0)
	}


	push(val){
		this.heap.push(val);
		let i = this.heap.length - 1;

		while(i>1 && this.heap[i] < this.heap[Math.floor(i/2)]){
			let temp = this.heap[i]
			this.heap[i] = this.heap[Math.floor(i/2)]
			this.heap[Math.floor(i/2)] = temp;
			i = Math.floor(i/2)
		}
	}

	pop(){
		if(this.heap.length===1){
			throw new Error("empty heap")
		}
		if(this.heap.length===2){
			return this.heap.pop()
		}

		let res = this.heap[1]
		this.heap[1] = this.heap.pop()
		let i=1

		while(2*i<this.heap.length){
			if(2*i+1<this.heap.length && this.heap[2*i+1]<this.heap[2*i]&&this.heap[i]>this.heap[2*i+1]){
				//swap the right child
				let temp = this.heap[i]
				this.heap[i] = this.heap[2*i+1]
				this.heap[2*i+1] = temp
				i = 2*i+1
			}else if(this.heap[i]>this.heap[2*i]){
				let temp = this.heap[i]
				this.heap[i] = this.heap[2*i]
				this.heap[2*i] = temp
				i=2*i
			}else{
				break;
			}
		}

		return res
	}
}