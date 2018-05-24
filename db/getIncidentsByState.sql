select 
    incidents.id, 
    state, 
    injuries.name as injury, 
    affectedareas.name as affected, 
    causes.name as cause 
from incidents

join injuries on incidents.injuryid = injuries.id
join affectedareas on affectedareas.id =injuries.affectedareaid
join causes on causes.id = incidents.causeid
where state = ${state}