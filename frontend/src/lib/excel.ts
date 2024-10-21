import ExcelJS from "exceljs";
import { getEventsByTag } from "./events";
import { TagModel } from "@/models/Tag";
import { MetadataModel } from "@/models/Metadata";
import { GroupId } from "@/models/Group";

export async function downloadEventsToExcel(
  groupId: GroupId,
  metadata: MetadataModel[],
  tags: TagModel[]
) {
  metadata;
  const events = await getEventsByTag(groupId, tags);
  const workbook = new ExcelJS.Workbook();
  for (const event of events) {
    const worksheet = workbook.addWorksheet(event.name);
    worksheet.columns = [
      { header: "Name", key: "course", width: 15 },
      ...metadata.map((md) => ({ header: md.key, key: md.id, width: 30 })),
      { header: "Assessment", key: "assessment", width: 30 },
      { header: "Input tokens", key: "input_tokens", width: 10 },
      { header: "Rubric included", key: "rubric_included", width: 10 },
      { header: "Output tokens", key: "output_tokens", width: 10 },
      { header: "GPT4o-mini cost", key: "gpt_cost", width: 10 },
      { header: "Rubric breakdown", key: "rubric_breakdown", width: 30 },
      { header: "Overall score", key: "overall_score", width: 10 },
      { header: "Overall grade", key: "overall_grade", width: 10 },
      { header: "Full rubric analysis", key: "rubric_analysis", width: 40 },
      { header: "Strengths", key: "strengths", width: 30 },
      { header: "Weaknesses", key: "weaknesses", width: 30 },
      { header: "Recommendations", key: "recommendations", width: 30 },
    ];
  }
  // const headerRow = worksheet.getRow(1);
  // headerRow.font = { name: 'Calibri', bold: true };
  // headerRow.eachCell((cell) => {
  //   cell.fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: 'ADD8E6' },
  //   };
  //   cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  // });
  // headerRow.height = 50;
  // const dataRows = markerMessages.map((markerMessage) => {
  //   const response = markerMessage.responses?.[0];
  //   const rubricBreakdown = response?.breakdown_of_rubric;
  //   const summary = response?.summary;
  //   let rubric_breakdown = '';
  //   let rubric_analysis: ExcelJS.RichText[] = [];
  //   if (rubricBreakdown) {
  //     response?.breakdown_of_rubric?.forEach((breakdown, index) => {
  //       rubric_breakdown += `${breakdown.topic} (${breakdown.score}, ${getGradeAcronym(breakdown.grade || '')})`;
  //       rubric_analysis.push({ text: `${breakdown.topic}\n`, font: { name: 'Calibri', bold: true } });
  //       rubric_analysis.push({ text: `${breakdown.content}${index !== rubricBreakdown.length - 1 ? '\n\n' : ''}` });
  //       if (index !== rubricBreakdown.length - 1) {
  //         rubric_breakdown += '\n';
  //       }
  //     });
  //   }
  //   return {
  //     course: markerMessage.course?.code,
  //     assessment: markerMessage.assessment_title,
  //     input_tokens: markerMessage.input_tokens,
  //     rubric_included: markerMessage.rubric ? 'Yes' : 'No',
  //     output_tokens: markerMessage.output_tokens,
  //     gpt_cost: getCost(markerMessage.input_tokens, markerMessage.output_tokens),
  //     rubric_breakdown,
  //     overall_score: response?.overall_score,
  //     overall_grade: getGradeAcronym(response?.overall_grade || ''),
  //     rubric_analysis,
  //     strengths: summary?.strengths,
  //     weaknesses: summary?.weaknesses,
  //     recommendations: summary?.recommendations,
  //   };
  // });

  // dataRows.forEach((dataRow) => {
  //   const row = worksheet.addRow(dataRow);
  //   row.height = 70;
  //   row.getCell('course').alignment = { horizontal: 'center' };
  //   row.getCell('assessment').alignment = { wrapText: true };
  //   row.getCell('input_tokens').alignment = { horizontal: 'center' };
  //   row.getCell('rubric_included').alignment = { horizontal: 'center' };
  //   row.getCell('output_tokens').alignment = { horizontal: 'center' };
  //   row.getCell('gpt_cost').alignment = { horizontal: 'center' };
  //   row.getCell('rubric_breakdown').alignment = { wrapText: true };
  //   row.getCell('overall_score').alignment = { horizontal: 'center' };
  //   row.getCell('overall_grade').alignment = { horizontal: 'center' };
  //   const analysisCell = row.getCell('rubric_analysis');
  //   analysisCell.value = { richText: dataRow.rubric_analysis };
  //   analysisCell.alignment = { wrapText: true, vertical: 'top' };
  //   row.getCell('strengths').alignment = { wrapText: true, vertical: 'top' };
  //   row.getCell('weaknesses').alignment = { wrapText: true, vertical: 'top' };
  //   row.getCell('recommendations').alignment = { wrapText: true, vertical: 'top' };
  // });
  // workbook.xlsx.writeBuffer().then((buffer) => {
  //   const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   saveAs(blob, `marker_assessments_report_${todaysDateInDDMMYY()}.xlsx`);
  // });
}
