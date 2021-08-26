(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var columnNames = [
            {
                id: "Facility_Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "State_Abbreviation",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Region",
                dataType: tableau.dataTypeEnum.int
            },
            {
                id: "Sampler_Name",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Sampler_Type",
                dataType: tableau.dataTypeEnum.string
            }
        ];

        let tableSchema = {
            id: "monitoringFeed",
            alias: "Fenceline Monitoring Data",
            columns: columnNames
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {

    $.getJSON("https://ftc-azure-function-test.azurewebsites.net/api/api?state=AR&start_date=2020-01-01&end_date=2020-04-04",function (resp) {
        var feat = resp,
            tableData = [];

            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "Facility_Name": feat[i].Facility_Name,
                    "State_Abbreviation": feat[i].State_Abbreviation,
                    "Region": feat[i].Region,
                    "Sampler_Name": feat[i].Sampler_Name,
                    "Sampler_Type": feat[i].Sample_Type
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Fenceline Monitoring Feed";
            tableau.submit();
        });
    });
})();

