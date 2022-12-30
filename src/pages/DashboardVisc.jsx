import React from 'react';
import ChartLine from '../components/ChartLine';
import ChartBar from '../components/ChartBar';
import StatusCard from '../components/StatusCard';

const DashboardVisc =  () => {
 
	return (
	<>
 <div className="bg-blue-400 px-3 md:px-8 h-40" />
 <div className="px-3 md:px-8">
		<div className="mx-auto max-w-full -mt-32">
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
						<StatusCard
						title="Vehiculos Registrados"/>
						<StatusCard title="Tics Impresas">
						</StatusCard>
						<StatusCard title="Tics Generadas">
						</StatusCard >
						<StatusCard title="Empresas Registradas">
						</StatusCard>
						</div>
					</div>
				</div>
		<div className="px-3 md:px-8 ">
			<div className="container mx-auto max-w-full">
				<div className="grid grid-cols-1 xl:grid-cols-6">
					<div className=" xl:col-start-1 xl:col-end-4 px-4 mb-14">
						<ChartLine />
					</div>
					<div className="xl:col-start-4 xl:col-end-7 px-4 mb-14">
						<ChartBar />
					</div>
				</div>
			</div>
		</div>

	</>

		);}

export default DashboardVisc;
