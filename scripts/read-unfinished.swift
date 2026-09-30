import Foundation
import EventKit
import Darwin
let store = EKEventStore()
func fail(_ message: String) -> Never {
    let data = try! JSONSerialization.data(withJSONObject: ["ok":false,"error":message])
    FileHandle.standardError.write(data); exit(1)
}
let status = EKEventStore.authorizationStatus(for: .reminder)
if status != .fullAccess { fail("Reminders access required. Run the existing remindctl authorize from this host first.") }
let lists = store.calendars(for: .reminder).filter { $0.title == "世界碎片" }
guard lists.count == 1 else { fail("Expected one 世界碎片 list; found \(lists.count)") }
let predicate = store.predicateForIncompleteReminders(withDueDateStarting: nil, ending: nil, calendars: lists)
var finished = false
store.fetchReminders(matching: predicate) { reminders in
    guard let reminders = reminders else { fail("EventKit fetch failed") }
    let rows: [[String:Any]] = reminders.filter { !$0.isCompleted }.map { r in
        var row: [String:Any] = ["id":r.calendarItemIdentifier,"title":r.title ?? "","notes":r.notes ?? "","isCompleted":false]
        if let date = r.creationDate { row["creationDate"] = ISO8601DateFormatter().string(from:date) }
        return row
    }.sorted { ($0["id"] as! String) < ($1["id"] as! String) }
    let output: [String:Any] = ["schemaVersion":1,"list":"世界碎片","includesCompleted":false,"count":rows.count,"exportedAt":ISO8601DateFormatter().string(from:Date()),"reminders":rows]
    do { let data = try JSONSerialization.data(withJSONObject:output,options:[.prettyPrinted,.sortedKeys]); FileHandle.standardOutput.write(data); finished = true } catch { fail(error.localizedDescription) }
}
let deadline = Date().addingTimeInterval(45)
while !finished && Date() < deadline { RunLoop.current.run(until:Date().addingTimeInterval(0.05)) }
if !finished { fail("EventKit timed out") }
