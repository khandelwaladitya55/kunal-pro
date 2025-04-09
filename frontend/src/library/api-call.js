import axios from "axios";
import {axiosApiInstance} from "@/library/helper";
const getProductData= async(id=null,status=null,category_slug=null,sortByName=null,sortByPrice=null,sortByLimit=null,color=null,min=null,max=null)=>
{
    let api="/product/get-data";
    if(id) 
    {
        api+=`/${id}`;
    }
    const query = new URLSearchParams();
 if(status)   query.append('status',status);
 if(category_slug) query.append('category',category_slug);
 if(sortByName) query.append('sortByName',sortByName);
 if(sortByPrice) query.append('sortByPrice',sortByPrice);
 if(sortByLimit) query.append('sortByLimit',sortByLimit);
 if(color) query.append('color',color);
 if(max) query.append('max',max);
 if(min) query.append('min',min);


    return axiosApiInstance.get(api+`?${query.toString()}`).then((response)=>
        {
        return response.data;
        } ).catch((error)=>
        {
        return null;
        })
    
}
const moveToTrashProductData = async()=>
{
    return axiosApiInstance.get('/product/get-trash-data').then((response)=>
    {
        return response.data;
    }).catch((error)=>
    {
        return null;
    })
}
const getCategoryData = async(status=null,id=null)=>
{
    let api = '/category/get-data';
    if(id) api+=`/${id}`;
if(status!=null)
{
    api+= `?status=${String(status)}`;

}

return axiosApiInstance.get(api).then((response)=>
{
return response.data;
} ).catch((error)=>
{
return null;
})
}
const getColorData = async(id=null)=>
    {
        let api = '/color/get-data';
        if(id) api+=`/${id}`;
    
    return axiosApiInstance.get(api).then((response)=>
    {
    return response.data;
    } ).catch((error)=>
    {
    return null;
    })
    }
const MoveToTrashData = async()=>
    {
    return axiosApiInstance.get( '/category/trash-get-data').then((response)=>
    {
    return response.data;
    } ).catch((error)=>
    {
    return null;
    })
    }
    const MoveToTrashColorData = async()=>
        {
        return axiosApiInstance.get( '/color/trash-get-data').then((response)=>
        {
        return response.data;
        } ).catch((error)=>
        {
        return null;
        })
        }
  
export {getCategoryData,MoveToTrashData,getColorData,MoveToTrashColorData,getProductData,moveToTrashProductData};