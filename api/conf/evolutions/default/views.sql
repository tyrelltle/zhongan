CREATE view analytics_summary AS

select p.name as projectname,
       p.contract as contractname,
       COALESCE(sum(c.payprice),0) as credit,
       COALESCE(sum(d.price),0) as debit
from project as p
left join credit as c on c.projectid=p.id
left join debit  as d on d.projectid=p.id
group by p.name, p.contract