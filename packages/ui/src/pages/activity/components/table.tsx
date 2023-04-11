
export const UserData = ({ users}) => {

    return (
        <>
            {
                users.map((tableusers: { id: any; operationDetail
                    : any; createdAt
                    : any; operation: any; }) => {
                    
                    const { id, operationDetail,createdAt, operation } = tableusers;
                        // const date = new Date (
                        //     "{createdAt}".split(" ").join("T")+".000Z")
                        // console.log("=============",date)
                    return(
                        <tr className=' border-b-2 border-border rounded '> 
                        <td className='px-6 py-3 w-56.25'>{id}</td>
                        <td className='px-6 py-3 w-56.25 '>{operationDetail}</td>
                        <td className='px-6 py-3 w-56 text-center'>{new Date (
                        createdAt.split(" ").join("T")+".000Z").toString()}</td>
                        <td className='px-6 py-3 w-56.25 '>{operation}</td>
                     
                  </tr>
                        )
                })
               
            }


        </>



    )
    

}

export default UserData;