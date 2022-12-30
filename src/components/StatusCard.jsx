import React from 'react';
import { Card, CardHeader, CardContent} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function StatusCard({
    color,
    icon,
    title,
    amount,
    percentage,
    percentageColor,
    percentageIcon,
    date,
}) {
    return (
        <div className="px-4 mb-10">
                <Card className='card'>
                    <div className="grid grid-cols-2 grid-rows-2">
                    <CardHeader className='m-5 col-start-1 col-end-2 row-start-1 row-end-2 text-black text-center grid items-center py-4 px-4 justify-center'
                            title={<Close></Close>}
                    />

                        <CardContent  className='text-right col-start-2 col-end-3'>
                            <div className="flex flex-col">
                                <div className='text-sm font-medium text-gray-400'>
                                    {title}
                                </div>
                                <div className='text-4xl text-gray-800'>
                                    02
                                </div>
                            </div>
                        </CardContent>
                        <CardContent  className='border-t-2 border-zinc-200 col-start-1 row-start-2 text-center col-end-3'>
                            <div className="flex-row align-middle">
                            
                            </div>
                        </CardContent>
                    </div>
                   
                        
                    </Card>
        </div>
    );
};