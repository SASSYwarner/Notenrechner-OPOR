# Notenrechner-OPOR
Notenrechner
package main.java;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

public class Marks {
	static int[] pruefungsfaecher_GK_Indexes = new int[12];
	static int[] weitereKurse_Indexes = new int[12];
	static int[] pruefungsfaecher_LK_Indexes = new int[8];
	static int[] pruefungen_GK_Indexes = new int[3];
	static int[] pruefungen_LK_Indexes = new int[2];

	public Marks() {
		readFromFile();
	}

	private void readFromFile() {
		try {
			File directory = new File(System.getenv("APPDATA") + "/Abiturrechner/");
			File directory = new File(System.getProperty("user.home") + "/.abiturrechner/");
			File file = new File(directory.toString() + "/data.txt");

			if(!directory.exists()) {	//if directory does not exist or was deleted, create it
				directory.mkdir();
				System.out.println("Der Ordner \"" + directory.toString() + "\" wurde erstellt");
			}
			if(!file.exists()) {		//if data file does not exist or was deleted, create it								
				file.createNewFile();
				System.out.println("Die Datei \"" + file.toString() + "\" wurde erstellt");
			}

			BufferedReader br = new BufferedReader(new FileReader(file));

			if(file.length() != 0) {
				String str = "";
				str = br.readLine();
				pruefungsfaecher_GK_Indexes = Arrays.stream(str.substring(1, str.length()-1).split(",")).map(String::trim).mapToInt(Integer::parseInt).toArray();
				str = br.readLine();
				weitereKurse_Indexes = Arrays.stream(str.substring(1, str.length()-1).split(",")).map(String::trim).mapToInt(Integer::parseInt).toArray();
				str = br.readLine();
				pruefungsfaecher_LK_Indexes = Arrays.stream(str.substring(1, str.length()-1).split(",")).map(String::trim).mapToInt(Integer::parseInt).toArray();
				str = br.readLine();
				pruefungen_GK_Indexes = Arrays.stream(str.substring(1, str.length()-1).split(",")).map(String::trim).mapToInt(Integer::parseInt).toArray();
				str = br.readLine();
				pruefungen_LK_Indexes = Arrays.stream(str.substring(1, str.length()-1).split(",")).map(String::trim).mapToInt(Integer::parseInt).toArray();		
				str = br.readLine();
				OptionalMarkPanel.optionalMark = Integer.parseInt(str);
			}

			br.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static void writeToFile() {
		try {
			PrintWriter pw = new PrintWriter(System.getenv("APPDATA") + "/Abiturrechner/data.txt");
			PrintWriter pw = new PrintWriter(System.getProperty("user.home") + "/.abiturrechner/data.txt");
			pw.println(Arrays.toString(pruefungsfaecher_GK_Indexes));
			pw.println(Arrays.toString(weitereKurse_Indexes));
			pw.println(Arrays.toString(pruefungsfaecher_LK_Indexes));
			pw.println(Arrays.toString(pruefungen_GK_Indexes));
			pw.println(Arrays.toString(pruefungen_LK_Indexes));
			pw.println(OptionalMarkPanel.optionalMark);
			pw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
