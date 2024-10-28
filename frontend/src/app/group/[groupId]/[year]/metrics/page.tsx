"use client";
import Tag from "@/components/event/Tag";
import Topbar from "@/components/Topbar";
import { EventsContext, TagsContext } from "@/lib/context";
import { GroupId } from "@/models/Group";
import { TagId, TagModel } from "@/models/Tag";
import { useContext, useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  Tooltip,
} from "recharts";

export default function Metrics({
  params,
}: {
  params: { groupId: GroupId; year: string };
}) {
  const events = useContext(EventsContext)?.reverse();
  const tags = useContext(TagsContext);
  const [metricByTag, setMetricByTag] = useState<{ [tagId: TagId]: any[] }>({});

  useEffect(() => {
    if (tags && events) {
      let eventsByTag: { [tagId: TagId]: any[] } = {};
      for (const tag of tags) {
        eventsByTag[tag.id] = [];
      }
      for (const event of events) {
        const eventTags = event.tags.map((t) => t.id);

        for (const tagId of eventTags) {
          if (eventsByTag[tagId]) {
            eventsByTag[tagId].push({
              name: event.name,
              Attendance: event.members?.length ?? 0,
            });
          }
        }
      }
      setMetricByTag(eventsByTag);
    }
  }, [tags, events]);

  return (
    <>
      <Topbar year={params.year} />
      <div className="mx-4">
        {Object.entries(metricByTag).map(([tId, m], i) => (
          <div key={i}>
            <Tag
              tag={tags?.find((t) => t.id === tId) ?? ({} as TagModel)}
              disabled
            />
            <LineChart width={530} height={250} data={m}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Attendance" stroke="#8884d8" />
            </LineChart>
          </div>
        ))}
      </div>
    </>
  );
}
