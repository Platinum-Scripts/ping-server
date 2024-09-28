import os
import json


# Function to calculate the average of a list of numbers
def calculate_average(pings):
    return sum(pings) / len(pings) if pings else float("inf")


# Function to process a single JSON file and return the average pings per server
def process_json_file(filepath):
    with open(filepath, "r") as file:
        data = json.load(file)

    servers = data.get("servers", {})
    averages = {}

    for server_name, server_data in servers.items():
        pings = server_data.get("pings", [])
        avg_ping = calculate_average(pings)
        averages[server_name] = avg_ping

    return averages


# Function to aggregate data from all JSON files in a folder
def process_folder(folder_path):
    all_averages = {}

    # Loop through all .json files in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            filepath = os.path.join(folder_path, filename)
            print(f"Processing {filename}...")
            averages = process_json_file(filepath)

            # Aggregate the averages
            for server_name, avg_ping in averages.items():
                if server_name not in all_averages:
                    all_averages[server_name] = []
                all_averages[server_name].append(avg_ping)

    return all_averages


# Function to determine the best server based on the lowest average ping
def determine_best_server(folder_path):
    all_averages = process_folder(folder_path)

    overall_averages = {}
    # Calculate the overall average ping for each server
    for server_name, pings in all_averages.items():
        overall_avg = calculate_average(pings)
        overall_averages[server_name] = overall_avg

    # Find the server with the lowest average ping
    best_server = min(overall_averages, key=overall_averages.get)

    print("\nOverall Average Pings Per Server:")
    for server_name, avg in overall_averages.items():
        print(f"{server_name}: {avg:.2f} ms")

    print(
        f"\nThe best server to use is: {best_server} with an average ping of {overall_averages[best_server]:.2f} ms"
    )


# Main execution
if __name__ == "__main__":
    # Define the folder containing the .json files
    input_folder = input("Enter the path to the folder with the JSON files: ").strip()

    if os.path.isdir(input_folder):
        determine_best_server(input_folder)
    else:
        print("Invalid folder path. Please try again.")
