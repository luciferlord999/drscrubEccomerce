import React from 'react'

function EmboideryAdded({ emboideryData }) {
    console.log(emboideryData);
    return (
        <>
            <span>Emboidery Added</span>

            <ul>
                {
                    emboideryData?.map((data, index) => {
                        return (<>

                            <li>

                                Type: {data?.type}
                            </li>
                            <li>
                                IconPlacement: {data?.iconPlacement}

                            </li>
                            <li>
                                
                            </li>


                        </>)
                    })
                }



            </ul>






        </>
    )
}

export default EmboideryAdded