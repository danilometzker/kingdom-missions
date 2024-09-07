import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import Quests from "./quests.json";
import Logo from "./assets/logo.webp";
import useMediaQuery from "@mui/material/useMediaQuery";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [selected, setSelected] = useState<number[] | null>(
        JSON.parse(localStorage.getItem("selected") || "{}")
    );

    const theme = useTheme();
    const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const colWidth = isSmScreen
        ? {
              width: 200,
          }
        : {
              flex: 1,
          };

    const columns: GridColDef[] = [
        {
            field: "Side Quest Name",
            headerName: "Missão",
            ...colWidth,
        },
        {
            field: "Starting Settlement Region",
            headerName: "Região",
            ...colWidth,
        },
        {
            field: "Quest Giver",
            headerName: "Falar com",
            ...colWidth,
        },
        {
            field: "Guide",
            headerName: "Tutorial",
            ...colWidth,
            renderCell: (value) => {
                if (!value) {
                    return value;
                }
                return value.value && <a href={value.value}>Video</a>;
            },
        },
    ];

    useEffect(() => {
        if (localStorage.getItem("selected")) {
            setSelected(JSON.parse(localStorage.getItem("selected") || "{}"));
            console.log(JSON.parse(localStorage.getItem("selected") || "{}"));
        }
        console.log(Logo);
    }, []);

    useEffect(() => {
        localStorage.setItem("selected", JSON.stringify(selected));
    }, [selected]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="appContainer">
                <div className="logo">
                    <img src={Logo} alt="Tears of the Kingdom" />
                </div>
                <Paper sx={{ width: "100%", minHeight: "100vh" }}>
                    <DataGrid
                        rows={Quests}
                        columns={columns}
                        checkboxSelection
                        sx={{
                            border: 0,
                            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                                {
                                    display: "none",
                                },
                        }}
                        autoHeight
                        initialState={{
                            pagination: { paginationModel: { pageSize: 50 } },
                        }}
                        rowSelectionModel={selected || []}
                        onRowSelectionModelChange={(selected) => {
                            setSelected(selected as number[]);
                        }}
                        disableRowSelectionOnClick={true}
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        slots={{ toolbar: GridToolbar }}
                        slotProps={{
                            toolbar: {
                                showQuickFilter: true,
                                printOptions: { disableToolbarButton: true },
                                csvOptions: { disableToolbarButton: true },
                            },
                        }}
                        localeText={{
                            toolbarQuickFilterPlaceholder: "Pesquisar",
                        }}
                    />
                </Paper>
            </div>
        </ThemeProvider>
    );
}

export default App;
