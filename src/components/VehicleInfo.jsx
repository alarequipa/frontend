import React, {useContext} from 'react';

import ValidationContext from '../context/ValidationContext';

const VehicleInfo = ({step3, home }) => {
    const {vehicles, vehicleToSave, empresa, rubro, relacion}=useContext(ValidationContext)


    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        {!home?(
        <div className="px-4 py-1 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Verifica la información de tu vehiculo</h3>
        </div>
        ):(
        ""
        )}

        <div className="border-t border-gray-200">
        
          <dl>
          {(vehicles.length>0)?(
            <>
             <div className="bg-gray-50 px-4  py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Placa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicles[0].plaque}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Marca</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicles[0].brand}</dd>
            </div>
            <div className="bg-gray-50 px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Color</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicles[0].color}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicles[0].type}</dd>
            </div>
            </>           
          ):
          <>
          <div className="bg-gray-50 px-4  py-2  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Placa</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicleToSave.plaque}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Marca</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicleToSave.brand}</dd>
            </div>
            <div className="bg-gray-50 px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Color</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicleToSave.color}</dd>
            </div>
            <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipo</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{vehicleToSave.type}</dd>
            </div>
          </>
          }
            {step3?(
            <>

            {rubro ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Rubro</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{rubro.name}</dd>
                </div>
            ) : ""}
            {empresa ? (
                <div className="bg-white px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{empresa.businessName}</dd>
                </div>
            ) : ""}
            {(relacion.conductor && relacion.propietario) ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Propietario | Conductor</dd>
                </div>
            ):relacion.conductor ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Conductor</dd>
                </div>
            ):relacion.propietario ? (
                <div className="bg-gray-50  px-4  py-1  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Relacion</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Propietario</dd>
                </div>
            ) : ""}             
            </>
            ) :""}                        
          </dl>   
        </div>
      </div>
    );
};

export default VehicleInfo;