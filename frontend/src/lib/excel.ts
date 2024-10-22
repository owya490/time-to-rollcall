import ExcelJS from "exceljs";
import { getEventsByTag } from "./events";
import { TagModel } from "@/models/Tag";
import { MetadataModel, MetadataSelectModel } from "@/models/Metadata";
import { saveAs } from "file-saver";
import { GroupId } from "@/models/Group";
import { toddMMYYYY, sameDay, hoursAndMinutes } from "@/helper/Time";
import { MemberMetadataModel } from "@/models/Member";

export async function downloadEventsToExcel(
  groupId: GroupId,
  tags: TagModel[],
  metadata?: MetadataModel[]
) {
  const events = await getEventsByTag(groupId, tags);
  const workbook = new ExcelJS.Workbook();
  for (const event of events) {
    const worksheet = workbook.addWorksheet(event.name);
    // Add event details at the top
    worksheet.addRow(["Name", event.name]);
    worksheet.addRow([
      "Date",
      `${toddMMYYYY(event.dateStart)}${
        sameDay(event.dateStart, event.dateEnd)
          ? " - " + hoursAndMinutes(event.dateEnd)
          : " - " + toddMMYYYY(event.dateEnd)
      }`,
    ]);
    worksheet.addRow(["Tags", event.tags.map((t) => t.name).join(", ")]);
    worksheet.addRow(["Total Attendance", event.members?.length ?? 0]);
    worksheet.mergeCells("B1", "C1");
    worksheet.mergeCells("B2", "C2");
    worksheet.mergeCells("B3", "C3");
    worksheet.mergeCells("B4", "C4");
    for (let i = 1; i <= 4; i++) {
      const row = worksheet.getRow(i);
      row.font = { bold: true, name: "Calibri", size: 12 };
      row.alignment = { vertical: "middle", horizontal: "left" };
    }
    worksheet.addRow([]);
    worksheet.getRow(5).values = [
      "Name",
      "Email",
      ...(metadata?.map((md) => md.key) ?? []),
    ];

    const headerRow = worksheet.getRow(5);
    headerRow.font = { name: "Calibri", bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ADD8E6" },
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
    headerRow.height = 40;

    worksheet.columns = [
      { key: "name", width: 20 },
      { key: "email", width: 35 },
    ].concat(metadata ? metadata.map((md) => ({ key: md.id, width: 30 })) : []);

    event.members?.map((member) =>
      worksheet.addRow({
        name: member.name,
        email: member.email,
        ...metadata?.reduce((acc, md) => {
          acc[md.id] =
            md.type === "input"
              ? member.metadata?.[md.id] ?? ""
              : (md as MetadataSelectModel).values[
                  member.metadata?.[md.id] ?? ""
                ];
          return acc;
        }, {} as MemberMetadataModel),
      })
    );
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Attendance_[${tags.map((t) => t.name).join(", ")}].xlsx`);
    });
  }
}
