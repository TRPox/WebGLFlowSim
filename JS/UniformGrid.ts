class UniformGrid {

    private width:number;
    private length:number;

    private delta:number = 0.005;

    private numberOfNodesX : number;
    private numberOfNodesY : number;

    private gridField : Array<GridNode>;
    

    public UniformGrid(width:number, length:number) {
        this.width = width;
        this.length = length;

        this.numberOfNodesX = Math.round(this.length / this.delta + 1);
        this.numberOfNodesY = Math.round(this.width / this.delta + 1);

        

    }

}