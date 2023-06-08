import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  Tooltip,
  Modal,
  Fade,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from '@mui/material';

import DataGrid, {
  Column,
  Pager,
  Paging,
  Sorting,
  ColumnFixing,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Grouping,
  GroupPanel,
  Export,
  Selection,
  Editing,
  Scrolling,
  LoadPanel,
} from 'devextreme-react/data-grid';

import { Delete, ViewList, Add, Edit } from '@mui/icons-material';

import { green } from '@mui/material/colors';

import { ToastContainer, toast } from 'react-toastify';

import 'devextreme/dist/css/dx.material.lime.light.compact.css';
import API from '../utils/api';

const FuncionesPuestoLaboral = () => {
  const applyFilterTypes = [
    {
      key: 'auto',
      name: 'Immediately',
    },
    {
      key: 'onClick',
      name: 'On Button Click',
    },
  ];

  const [userName, setUserName] = useState('');

  const [maestroEducacion, setMaestroEducacion] = useState([]);
  const [maestroPuestoLaboralEducacion, setMaestroPuestoLaboralEducacion] = useState([]);

  const [positionDisableSorting, setPositionDisableSorting] = useState(false);
  const [showFilterRow, setShowFilterRow] = useState(true);
  const [showHeaderFilter, setShowHeaderFilter] = useState(true);
  const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);
  const [autoExpandAll, setAutoExpandAll] = useState(true);

  const [buscando, setBackDrop] = useState(false);
  const [selected, setSelected] = useState(null);
  const [codigoNotificacion, setCodigoNotificacion] = useState(0);
  const [idFila, setIdFila] = useState(0);
  const handleCerrarBackDrop = () => {
    setBackDrop(false);
  };
  const handleAbrirBackDrop = () => {
    setBackDrop(true);
  };

  useEffect(() => {
    const cargar = async () => {
      handleAbrirBackDrop();

      await cargarMaestroEducacion();

      handleCerrarBackDrop();
    };

    cargar();
  }, []);

  const cargarMaestroEducacion = async () => {
    try {
      handleAbrirBackDrop();

      const uri = 'api/EmpleadoOnBoarding/';

      const request = await API.fetchGetRequest(uri);

      if (request.statusCode === 200) {
        setMaestroEducacion(request.data.ficha);
      }
    } catch (e) {
      console.log(e);
    } finally {
      handleCerrarBackDrop();
    }
  };

  return (
    <>
      <Backdrop open={buscando}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />

      {maestroEducacion !== undefined ? (
        <Paper>
          <DataGrid
            dataSource={maestroEducacion}
            //   defaultColumns={this.props.columns}
            showBorders
            rowAlternationEnabled
            // ref={(ref) => (dataGrid = ref)}
            allowColumnReordering
            allowColumnResizing
            columnAutoWidth
          >
            <FilterRow visible={showFilterRow} applyFilter={currentFilter} />
            <HeaderFilter visible={showHeaderFilter} />
            <GroupPanel visible={false} />
            <Grouping autoExpandAll={autoExpandAll} />
            <SearchPanel visible={false} width={240} placeholder="Search..." />
            {/* <Selection mode="multiple" /> */}
            <LoadPanel
              enabled
              shadingColor="rgba(0,0,0,0.4)"
              showIndicator
              shading
              showPane
              closeOnOutsideClick={false}
            />
            <Editing mode="row" useIcons allowUpdating={false} allowDeleting={false} />
            {/* <Column
            caption="Opciones"
            allowFiltering={false}
            allowSorting={false}
            cellRender={cellOpcionesSolicitud}
          /> */}
            <Column dataField="DPI" caption="DPI" dataType="number" />
            <Column dataField="NombreCompleto" caption="Nombre" />
            <Column dataField="FechaAlta" caption="Fecha de Alta" dataType="date" format="dd/MM/yyyy" />
            <Column dataField="CodigoPuestoLaboral" caption="Código Puesto Laboral" />
            <Column dataField="PuestoLaboral" caption="Puesto Laboral" />

            <ColumnFixing enabled />
            <Sorting mode="multiple" />
            <Paging defaultPageSize={50} />
            <Pager showPageSizeSelector allowedPageSizes={[50, 100]} showInfo />
            <Export enabled allowExportSelectedData />
            <Scrolling columnRenderingMode="virtual" />
          </DataGrid>
        </Paper>
      ) : undefined}
    </>
  );
};

export default FuncionesPuestoLaboral;
