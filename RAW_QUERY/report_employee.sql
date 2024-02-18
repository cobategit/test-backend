select
	emp.id,
	emp.nik,
	emp.name,
	emp.is_active,
	ep.gender,
	CONCAT(EXTRACT(YEAR FROM AGE(current_date, ep.date_of_birth)), ' Years Old') AS age,
	ee.name as school_name,
	ee.level,
	CONCAT(
        COUNT(distinct case when ef.relation_status = 'Istri' then ef.id when ef.relation_status = 'Suami' then ef.id end),
	' Istri & ',
	COUNT(distinct case when ef.relation_status = 'Anak' then ef.id when ef.relation_status = 'Anak Sambung' then ef.id end),
	' Anak'
    ) as family_data
from
	"employee" as emp
join employee_education ee on
	ee.employee_id = emp.id
join employee_profile ep on
	ep.employee_id = emp.id
left join 
    "employee_family" as ef on
	emp.id = ef.employee_id
group by
	emp.id,
	emp.name,
	ep.gender,
    ep.date_of_birth,
    ee.level,
    ee.name;