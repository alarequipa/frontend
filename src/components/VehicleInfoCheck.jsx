import React from 'react';


const VehicleInfoCheck = ({vehicle}) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-1 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Información de tu vehiculo</h3>
        </div>
        <div className="border-t border-gray-200">

          <dl>
             <div className="bg-gray-50 px-4  py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Placa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.vehicleId.plaque}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Marca</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.vehicleId.brand}</dd>
            </div>
            <div className="bg-gray-50 px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Color</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.vehicleId.color}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.vehicleId.type}</dd>
            </div>      
            <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Rubro</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.heading.name}</dd>
                </div>
            {vehicle.business && vehicle.business!=="" ? (
                <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicle.business.businessName}</dd>
                </div>
            ) : ""}
            {(vehicle.driver && vehicle.owner) ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Propietario | Conductor</dd>
                </div>
            ):vehicle.driver ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Conductor</dd>
                </div>
            ):vehicle.owner ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Propietario</dd>
                </div>
            ) : ""}             
                    
          </dl>   
        </div>
      </div>
    );
};

export default VehicleInfoCheck;