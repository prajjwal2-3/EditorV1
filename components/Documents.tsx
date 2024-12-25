"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getdocs } from "@/actions/doc.action";
import { formatDistanceToNow } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";

interface doc {
  id: number;
  createdBy: string;
  title: string;
  htmlString: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Documents() {
  const { data, isLoading } = useQuery<doc[]>({
    queryKey: ["docs"],
    queryFn: async () => {
      return await getdocs("prajjwalbh25@gmail.com");
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Documents in DB</h2>
      {isLoading && <div className="text-gray-500">Loading documents...</div>}
      {data && (
        <>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((doc) => (
                <Card key={doc.id} className="bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Created By: {doc.createdBy}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Created: {formatDistanceToNow(new Date(doc.createdAt))} ago
                    </p>
                    <p className="text-sm text-gray-500">
                      Last Edited: {formatDistanceToNow(new Date(doc.updatedAt))} ago
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => {
                        alert(`Viewing Document: ${doc.title}`);
                      }}
                    >
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No documents found</div>
          )}
        </>
      )}
    </div>
  );
}
