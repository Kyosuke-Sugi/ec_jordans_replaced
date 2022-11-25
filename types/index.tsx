export type Item = {
    id: number,
    name: string, 
    series: string, 
    year: number,
    description: string, 
    setprice: string,      
    color:string, 
    deleted: boolean
}

export type Stock ={
id: number,
itemID:number,
price: number,
size: number,
image1: string, 
image2: string, 
image3: string, 
image4: string, 
image5: string, 
amount: number,
arrival: Date,
condition: string,
item:[]
}
