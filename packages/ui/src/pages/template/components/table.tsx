
export const UserData = ({ users }) => {

    return (
        <>
            {
                users.map((tableusers: {
                    id: any;
                    name: any;
                    networkProvider : any;
                    networkDirectory : any;
                    createdAt: any; 
                    operation: any;
                }) => {

                    const { id, name, networkProvider, networkDirectory
                        , createdAt } = tableusers;
                   
                    return (
                        <tr className=' border-b-2 border-border rounded '>
                            <td className='px-6 py-3 w-56.25'>{id}</td>
                            <td className='px-6 py-3 w-56.25 '>{name}</td>
                            <td className='px-6 py-3 w-56.25 '>{networkProvider}</td>
                            <td className='px-6 py-3 w-56.25 '>{networkDirectory}</td>
                            <td className='px-6 py-3 w-56 text-center'>{new Date(
                                createdAt.split(" ").join("T") + ".000Z").toString()}</td>
                           
                        </tr>
                    )
                })

            }


        </>

    )


}

export default UserData;