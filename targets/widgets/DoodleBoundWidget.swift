import WidgetKit
import SwiftUI

// Step 1: Define the data model for our Supabase response
struct SupabaseSnapshotResponse: Codable {
    let snapshot_base64: String
}

// Step 2: The Timeline Provider fetches data in the background
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), image: nil)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), image: nil)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        fetchLatestCanvas { base64String in
            var decodedImage: UIImage? = nil
            if let b64 = base64String, 
               let data = Data(base64Encoded: b64, options: .ignoreUnknownCharacters) {
                decodedImage = UIImage(data: data)
            }
            
            let entry = SimpleEntry(date: Date(), image: decodedImage)
            // Refresh every 15 minutes to save battery, but it also refreshes on deep links
            let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
            let timeline = Timeline(entries: [entry], policy: .after(nextUpdateDate))
            completion(timeline)
        }
    }
    
    // Hit the Supabase REST API directly!
    func fetchLatestCanvas(completion: @escaping (String?) -> Void) {
        let urlString = "https://iotmswilodllxmbcoqqq.supabase.co/rest/v1/canvas_snapshots?select=snapshot_base64&order=updated_at.desc&limit=1"
        guard let url = URL(string: urlString) else {
            completion(nil)
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        
        // Use the Anon Key
        let anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdG1zd2lsb2RsbHhtYmNvcXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MDA2NzgsImV4cCI6MjA5MDA3NjY3OH0.EXb9f1a3tMelNude95gvDmOdMLrkAJ9mD7EsUd1ds3U"
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(anonKey)", forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                completion(nil)
                return
            }
            // Supabase returns an array for SELECT queries
            if let decodedResponse = try? JSONDecoder().decode([SupabaseSnapshotResponse].self, from: data),
               let first = decodedResponse.first {
                // Return the base64 string, omitting any data prefix if present
                let cleanB64 = first.snapshot_base64.replacingOccurrences(of: "data:image/jpeg;base64,", with: "")
                                                    .replacingOccurrences(of: "data:image/png;base64,", with: "")
                completion(cleanB64)
            } else {
                completion(nil)
            }
        }.resume()
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let image: UIImage?
}

// Step 3: Design the Widget UI
struct DoodleBoundWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        ZStack {
            Color(red: 30/255, green: 30/255, blue: 30/255) // Dark background
            
            if let img = entry.image {
                Image(uiImage: img)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
            } else {
                VStack {
                    Image(systemName: "scribble.variable")
                        .font(.system(size: 40))
                        .foregroundColor(Color(red: 167/255, green: 41/255, blue: 90/255))
                    Text("No Canvas Yet")
                        .font(.caption)
                        .bold()
                        .foregroundColor(.white)
                        .padding(.top, 4)
                }
            }
        }
    }
}

@main
struct DoodleBoundWidget: Widget {
    let kind: String = "DoodleBoundWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            DoodleBoundWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Doodle Bound")
        .description("See your friends' live canvases directly on your Home Screen.")
        .supportedFamilies([.systemSmall, .systemLarge])
    }
}
