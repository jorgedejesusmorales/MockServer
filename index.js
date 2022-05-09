const express = require('express')

const app = express()
const port = 3000

const STEPS = ["scan-location",
    "scan-shelf",
    "scan-inventory",
    "scan-container",
    "confirm-quantity-multi",
    "finish-picking",
    "finished"
    ]

const IDS = ["7b2ca1f3-36b5-4338-ab93-9444e25fa501",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa502",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa503",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa504",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa505",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa506",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa507",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa508",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa509",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa510",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa511",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa512",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa513",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa514",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa515",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa516",
    "7b2ca1f3-36b5-4338-ab93-9444e25fa517"]

//const WAREHOUSE_ID="MXTW01";
const WAREHOUSE_ID="BRTW01";


const getResponse = ( index ,step_id, route_id, tote_number, target_container,unit_group_id,unit_id,order_quantity,inventory_id)=>{
    console.log(`tote_number=${tote_number} target_container=${target_container}  unit_group_id=${unit_group_id}  unit_id=${unit_id} `)
    return {
    "id": IDS[index],
    "step": STEPS[step_id],
    "last_step": "scan-shelf",
    "next_events": [
        "inventory-scanned",
        "item-lost",
        "quarantine-started",
        "item-not-conveyable"
    ],
    "context": {
        "id": IDS[step_id],
        "warehouse_id": WAREHOUSE_ID,
        "user_id": 710366311,
        "picking_status": "working",
        "target_container": target_container,
        "container_address_id": "",
        "checkpoint_id": 0,
        "checkpoint_ids": [
            4107051433044719539
        ],
        "units_next_step": [],
        "groups": [
            {
                "unit_group_id": unit_group_id,
                "unit_ids": [
                    unit_id
                ]
            }
        ],
        "shelf_address_id": "RS-0-001-001-01-01",
        "shelf_scanned": true,
        "inventory_id": inventory_id,
        "inventory_scanned": false,
        "picking_type": "multi",
        "areas": [
            "RS"
        ],
        "wave": "12abr22_1624_Multi",
        "wave_id": 20733,
        "checkpoint_status": "working",
        "floor_changed": false,
        "estimated_time_departure": "2022-05-04T05:00:00Z",
        "used_containers": [],
        "units_audit": {},
        "grouping_type": "ORDER",
        "current_group_id": 202204121623,
        "order_type": "multi",
        "route_picking_type": "by_group",
        "allowed_containers": "MU-TC-T1-001-13B",
        "not_allowed_containers": "",
        "batch_quantity": 1,
        "order_quantity": order_quantity,
        "allow_multi_totes_order_picking": true,
        "permission_forklift": true,
        "missing_reservation": false,
        "units_to_drop": [],
        "conveyable": true,
        "current_units_to_drop": [],
        "item_not_conveyable_reported": false,
        "container_tracking_enabled": false,
        "picking_bulky": false,
        "picking_massive": true,
        "route_id":route_id,
        "tote_number": tote_number
    }
}
}

app.post('/wms/pickings', (req, res) => {
    console.log("/wms/pickings");
    res.send(getResponse(0,0,0));

    //res.send(getResponse(2,2,7678340,1,"",202111081706,4107051433002284850));
  })

app.post('/wms/pickings/:id_execution/events', (req, res) => {
    console.log("POST Events return 201");
    res.status(201).send();
})

app.get('/wms/pickings/:id_execution', (req, res) => {
    var id_execution = req.params['id_execution']
    var body_request = req.body;

    console.log("POST /wms/pickings/"+id_execution);
    console.log("Body => ", JSON.stringify(body_request))
    let response={}
    
    if(id_execution===IDS[0]){
        response=getResponse(1,1,7678340,1,"",202111081707,4107051433002284851,4,"LUHT72019")
    }
    else if(id_execution===IDS[1]){
        response=getResponse(2,2,7678340,1,"",202111081707,4107051433002284851,4,"LUHT72019")
    }
    else if(id_execution===IDS[2]){
        response=getResponse(16,3,7678340,1,"",202111081707,4107051433002284851,4,"LUHT72019")
    }
    else if(id_execution===IDS[16]){
        response=getResponse(3,4,7678340,1,"",202111081707,4107051433002284851,4,"LUHT72019")
    }
    else if(id_execution===IDS[3]){
        response=getResponse(4,1,7678340,1, "MU-TC-T1-001-13B",202204121623,4107051433044719539,1,"CZVM34818")
    }
    else if(id_execution===IDS[4]){
        response=getResponse(5,2,7678340,1, "MU-TC-T1-001-13B",202204121623,4107051433044719539,1,"CZVM34818")
    }
    else if(id_execution===IDS[5]){
        response=getResponse(6,3,7678340,1,"MU-TC-T1-001-13B",202204121623,4107051433044719539,1,"CZVM34818")
    }
    else if(id_execution===IDS[6]){
        response=getResponse(7,1,7678340,1,"any",202111081706,4107051433002284850,5,"XYRN73943")
    }
    else if(id_execution===IDS[7]){
        response=getResponse(8,2,7678340,2,"any",202111081706,4107051433002284850,5,"XYRN73943")
    }
    else if(id_execution===IDS[8]){
        response=getResponse(9,3,7678340,2,"any",202111081706,4107051433002284850,5,"XYRN73943")
    }
    else if(id_execution===IDS[9]){
        response=getResponse(10,4,7678340,2,"any",202111081706,4107051433002284850,5,"XYRN73943")
    }
    else if(id_execution===IDS[10]){
        response=getResponse(11,1,7678340,2,"MU-TC-T1-001-13C",202111081706,4107051433002284850,1,"CBWE10116")
    }
    else if(id_execution===IDS[11]){
        response=getResponse(12,2,7678340,2,"MU-TC-T1-001-13C",202111081706,4107051433002284850,1,"CBWE10116")
    }
    else if(id_execution===IDS[12]){
        response=getResponse(13,3,7678340,2,"MU-TC-T1-001-13C",202111081706,4107051433002284850,1,"CBWE10116")
    }
    else if(id_execution===IDS[13]){
        response=getResponse(14,5,7678340,2,"MU-TC-T1-001-13C",202111081706,4107051433002284850,1,"CBWE10116")
    }
    else if(id_execution===IDS[14]){
        response=getResponse(15,6,7678340,2,"MU-TC-T1-001-13C",202204121623,4107051433002284850,1,"CBWE10116")
    }
    else{
        response=getResponse(1,1,7678340,1,"",202111081707,4107051433002284851,1);

        //response=getResponse(2,2,7678340,1,"",202111081707,4107051433002284851)
    }
    
    res.send(response);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



