
export const UserData = ({ users }) => {

    return (
        <>
            {
                users.map((tableusers: {
                    name: any;
                    networkProvider : any;
                    networkDirectory : any;
                    createdAt: any; 
                    networkState:any;
                }) => {
                    const { id, name, networkProvider, networkDirectory,networkState
                        , createdAt } = tableusers;
                    return (
                        <tr className=' border-b-2 border-border rounded '>
                            <td className='px-6 py-3 w-56.25 '>{name}</td>
                            <td className='px-6 py-3 w-56.25 '>{networkProvider}</td>
                            <td className='px-6 py-3 w-56.25 '>{networkDirectory}</td>
                            <td className='px-6 py-3 w-56 text-center'>{new Date(
                                createdAt.split(" ").join("T") + ".000Z").toString()}</td>
                            <td className='px-6 py-3 w-56.25 '>{ networkState}</td>

                        </tr>
                    )
                })

            }


        </>

    )


}

export default UserData;