#!/usr/bin/env python3
"""
Debug script to show CSV column names
"""
import csv
import sys

csv_file = input("Enter CSV file path: ").strip().strip("'\"")

with open(csv_file, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    print("\n" + "=" * 60)
    print("📋 CSV Column Names:")
    print("=" * 60)
    
    for i, col in enumerate(reader.fieldnames, 1):
        print(f"{i}. '{col}'")
    
    print("\n" + "=" * 60)
    print("📊 First Row Data:")
    print("=" * 60)
    
    first_row = next(reader)
    for key, value in first_row.items():
        if value:  # Only show non-empty values
            print(f"{key}: {value}")
