import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
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
    Tooltip,
    Export,
    Selection,
    Editing,
    Button,
    Scrolling,
  } from "devextreme-react/data-grid";
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Tabs, Tab } from '@mui/material';
// components
import { Delete, Edit } from '@mui/icons-material';
import Pendientes from '../components/PendientesTab';

// sections


// ----------------------------------------------------------------------




export default function DashboardAppPage() {
  const theme = useTheme();

  const applyFilterTypes = [
    {
      key: "auto",
      name: "Immediately",
    },
    {
      key: "onClick",
      name: "On Button Click",
    },
  ];
  
  const [value, setValue] = useState(0);

  const [positionDisableSorting, setPositionDisableSorting] = useState(false);
  const [showFilterRow, setShowFilterRow] = useState(false);
  const [showHeaderFilter, setShowHeaderFilter] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key);
  const [autoExpandAll, setAutoExpandAll] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cellOpciones = (rowInfo) => {
    console.log("RowInfo",rowInfo.data)
    return (
      <>
          <Delete
            style={{ color: "#337ab7", cursor: "pointer" }}
            onClick={() =>
              console.log("delete")
            }
          />
      </>
          
    );
  };

  return (
    <>
      <Helmet>
        <title> Evaluación | OnBoarding </title>
      </Helmet>

      <Container maxWidth="xl">
      <DataGrid
          dataSource={competenciasPuesto}
          //   defaultColumns={this.props.columns}
          showBorders
          rowAlternationEnabled
          // ref={(ref) => (dataGrid = ref)}
          allowColumnReordering
          allowColumnResizing
          columnAutoWidth
          backgroundColor = {'red'}
        >
          <FilterRow
            visible={showFilterRow}
            applyFilter={currentFilter}
          />
          <HeaderFilter visible={showHeaderFilter} />
          <GroupPanel visible={false} />
          <Grouping autoExpandAll={autoExpandAll} />
          <SearchPanel visible={false} width={240} placeholder="Search..." />
          {/* <Selection mode="multiple" /> */}
          <Editing
            mode="row"
            useIcons
            allowUpdating={false}
            allowDeleting={false}
          />
          

          {/* <Column
            dataField="CodigoTipoSalario"
            caption="Código Tipo Salario"
            dataType="number"
          /> */}
          <Column
            caption="Opciones"
            allowFiltering={false}
            allowSorting={false}
            cellRender={cellOpciones}
          />
          
          <Column
            dataField="Nombre"
            caption="Competencia"
            
          />
          <Column
            dataField="TipoCompetencia"
            caption= "Competencia"
            groupIndex={0}
            allowGrouping 
            visible = {false}
          />

          <Column
            dataField="Descripcion"
            caption="Descripcion"
          />
          <Column
            dataField="Tipo"
            caption="Tipo"
            groupIndex={1}
          />
          <ColumnFixing enabled />
          <Sorting mode="multiple" />
          <Paging defaultPageSize={10} />
          <Pager
            showPageSizeSelector
            allowedPageSizes={[5, 10, 20]}
            showInfo
          />
          <Export enabled={false} allowExportSelectedData={false} />
          <Scrolling columnRenderingMode="virtual" />
        </DataGrid>
      </Container>
    </>
  );
}
